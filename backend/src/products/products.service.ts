import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto) {
    const product = await this.productModel.create(dto);
    return product;
  }

  async findAll(query: QueryProductDto) {
    const { page = 1, limit = 10, search, category, isActive, sortBy = 'createdAt', sortOrder = 'desc' } = query;

    const filter: any = {};

    if (search) {
      filter.$text = { $search: search };
    }
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }
    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    const skip = (page - 1) * limit;
    const sort: any = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

    const [data, total] = await Promise.all([
      this.productModel.find(filter).sort(sort).skip(skip).limit(limit).lean(),
      this.productModel.countDocuments(filter),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    };
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).lean();
    if (!product) throw new NotFoundException(`Producto con id "${id}" no encontrado`);
    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.productModel
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .lean();
    if (!product) throw new NotFoundException(`Producto con id "${id}" no encontrado`);
    return product;
  }

  async remove(id: string) {
    const product = await this.productModel.findByIdAndDelete(id).lean();
    if (!product) throw new NotFoundException(`Producto con id "${id}" no encontrado`);
    return { message: 'Producto eliminado exitosamente', id };
  }

  async getCategories() {
    return this.productModel.distinct('category', { isActive: true });
  }

  async getStats() {
    const [total, active, outOfStock] = await Promise.all([
      this.productModel.countDocuments(),
      this.productModel.countDocuments({ isActive: true }),
      this.productModel.countDocuments({ stock: 0, isActive: true }),
    ]);

    const avgPrice = await this.productModel.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: null, avg: { $avg: '$price' }, total: { $sum: '$price' } } },
    ]);

    return {
      total,
      active,
      inactive: total - active,
      outOfStock,
      avgPrice: avgPrice[0]?.avg || 0,
    };
  }
}
