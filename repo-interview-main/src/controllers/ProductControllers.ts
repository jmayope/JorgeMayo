import "reflect-metadata";
import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Params,
  NotFoundError,
  BadRequestError,
} from "routing-controllers";
import { ProductDTO } from "../dto/Product";
import { MESSAGE_ERROR } from "../const/message-error.const";
import { ProductInterface } from "../interfaces/product.interface";

@JsonController("/products")
export class ProductController {
  private static products: ProductInterface[] = [];

  @Post("")
  getAll(@Body() body: any) {
    let productsFiltereds: ProductInterface[] = this.getProductsByText(body.where.text)

    let limit: number = 5;
    let currentPage: number = 1;
    if (body.pagination) {
      limit = body.pagination.limit;
      currentPage = body.pagination.currentPage;
    }
    const start = (currentPage - 1) * limit;
    const end = start + limit;
    productsFiltereds = productsFiltereds.splice(start, end);
    return {
      data: productsFiltereds,
    };
  }

  @Get("/verification/:id")
  verifyIdentifier(@Param("id") id: number | string) {
    return ProductController.products.some((product) => product.id === id);
  }

  @Get("/:id")
  getOne(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if(index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }
    return ProductController.products.find((product) => product.id === id);
  }

  @Post("/quantity")
  getQuantity(@Body() body: any) {
    let quantityProducts: ProductInterface[] = this.getProductsByText(body.where.text);
    return {
      data: { quantity: quantityProducts.length} 
    };
  }

  @Post("/new")
  createItem(@Body({ validate:true }) productItem: ProductDTO) {
    
    const index = this.findIndex(productItem.id);

    if(index !== -1) {
      throw new BadRequestError(MESSAGE_ERROR.DuplicateIdentifier);
    }
    
    ProductController.products.push(productItem);
    return {
      message: "Product added successfully",
      data: productItem,
    };
  }

  @Put("/:id")
  put(@Param("id") id: number | string, @Body() productItem: ProductInterface) {
    const index = this.findIndex(id);

    if(index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }

    ProductController.products[index] = {
      ...ProductController.products[index],
      ...productItem,
    };
    return {
      message: "Product updated successfully",
      data: productItem,
    };
  }

  @Delete("/:id")
  remove(@Param("id") id: number | string) {
    const index = this.findIndex(id);

    if(index === -1) {
      throw new NotFoundError(MESSAGE_ERROR.NotFound);
    }
        
    ProductController.products = [...ProductController.products.filter((product) => product.id !== id)];
    return {
      message: "Product removed successfully",
    };
  }

  private findIndex(id: number | string) {
    return ProductController.products.findIndex((product) => product.id === id);
  }

  private getProductsByText(text: string) {

    return text ? ProductController.products.filter((product) => product.name.toUpperCase().includes(text.toUpperCase())) : ProductController.products;
  }
}
