import { Injectable } from '@nestjs/common';
import {sayHello} from "@fota/types";

@Injectable()
export class AppService {
  getHello(): string {
    return sayHello('Gideon');
  }
}
