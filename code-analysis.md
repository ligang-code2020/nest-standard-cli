## Controller 的声明与作用
```js
@Controller("users")
export class UserController {
  @Get() findAll() {
    return [];
  }
}
```
* `@Controller('users')` 将类标记为路由控制器，定义基础路径 `/users`。
* `@Get()` 将方法映射到 `GET /users` 路由。

>1. Nest 如何发现并注册这些装饰的控制器？
> 
>2. 装饰器如何将元数据转化为实际的路由逻辑？