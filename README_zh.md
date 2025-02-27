# Alosaur 🦖

Alosaur - 基于[Deno](https://github.com/denoland) 的Web框架 🦖.

![test](https://github.com/alosaur/alosaur/workflows/test/badge.svg)
![sponsors](https://opencollective.com/alosaur/sponsors/badge.svg)

- **Area** - 程序的模块。
- **Controller** - 控制器，用来控制程序的运行流程。
- **Middleware** - 中间件，提供一个机制，可以方便地过滤HTTP请求
- **Hooks** - 钩子，可用于模块、控制器或任务，有三个生命周期函数： `onPreAction, onPostAction, onCatchAction`。
- **Decorators** - 装饰器，可用于SQL查询、cookie、参数、路由等。
- **Dependency Injection** - 依赖注入，使用轻量级依赖项注入容器`microsoft/TSyringe` ([more about alosaur injection](/src/injection)).
- **Render pages** 可以使用任意的模板引擎. [(了解更多)](https://github.com/alosaur/alosaur#render-pages)

想要尝试一下在[Deno Deploy](https://deno.com/deploy)中使用Alosaur框架吗? 使用[Alosaur轻量版](https://github.com/alosaur/alosaur-lite)

---

## 开发计划

2021年

- [x] 微服务 (TCP) [范例](https://github.com/alosaur/alosaur/tree/master/examples/microservice)
- [ ] CLI: run applications
- [ ] Create REPL http tool (tool for tests API, WebSockets etc), integrate with Alosaur openapi
- [ ] Background process, BackgroundService, WebJobs, cron
- [ ] Docs website

1月-3月

- [x] Response cache store, attribute
- [x] 命令行工具: [alosaur/cli](https://github.com/alosaur/cli) (创建应用程序, 构建openapi, 测试等等)

2020年第4季度 – 10-12月

- [x] WebSocket
- [x] SSE
- [x] Add [Alosaur security](https://github.com/alosaur/alosaur/tree/master/src/security).
  - [x] Identifications middlwares like session
  - [x] SecurityContext: `context.security.auth.signOutAsync`, `signInAsync`, `identity`
  - [x] Authentication schemas (Cookies, JWT Bearer)
  - [x] Authorization decorators and hooks, roles, policy
  - [x] External auth strategies, OAuth base handler (Google, Facebook, Twitter, etc, examples)
        [文档](https://github.com/alosaur/alosaur/tree/master/src/security/oauth),
        [范例](https://github.com/alosaur/alosaur/blob/master/examples/auth/app.ts)
- [x] OpenAPI type reference

---

## 范例

- [基础范例与OpenAPI v3生成器(Swagger)](https://github.com/alosaur/alosaur/tree/master/examples/basic)
- [CORS中间件](https://github.com/alosaur/alosaur/tree/master/examples/cors)
- [SPA中间件](https://github.com/alosaur/alosaur/tree/master/examples/spa)
- [WebSocket中间件](https://github.com/alosaur/alosaur/tree/master/examples/ws)
- [静态文件中间件](https://github.com/alosaur/alosaur/tree/master/examples/static)
- [PostgreSQL数据库](https://github.com/alosaur/alosaur/tree/master/examples/db)
- 模板引擎: [Dejs](https://github.com/alosaur/alosaur/tree/master/examples/dejs),
  [Handlebars](https://github.com/alosaur/alosaur/tree/master/examples/handlebars),
  [Angular](https://github.com/alosaur/alosaur/tree/master/examples/angular),
  [React](https://github.com/alosaur/alosaur/tree/master/examples/react),
  [Eta](https://github.com/alosaur/alosaur/tree/master/examples/eta)

- [数据校验](https://github.com/alosaur/alosaur/tree/master/examples/validator)
- [处理HTML表单的multipart/form-data类型](https://github.com/alosaur/alosaur/tree/master/examples/form-data)
- [依赖注入](https://github.com/alosaur/alosaur/tree/master/examples/di)
- [Docker](https://github.com/alosaur/alosaur/tree/master/examples/docker)
- [钩子](https://github.com/alosaur/alosaur/tree/master/examples/hooks)
- [微服务](https://github.com/alosaur/alosaur/tree/master/examples/microservice)
- [会话管理器, 认证与授权, OAuth,Google登录等](https://github.com/alosaur/alosaur/blob/master/examples/auth/app.ts)

## 一个简单的例子

app.ts:

```typescript
import { App, Area, Controller, Get } from "https://deno.land/x/alosaur@v0.36.0/mod.ts";

@Controller() // or specific path @Controller("/home")
export class HomeController {
  @Get() // or specific path @Get("/hello")
  text() {
    return "Hello world";
  }
}

// 定义模块
@Area({
  controllers: [HomeController],
})
export class HomeArea {}

// 创建 alosaur 应用程序
const app = new App({
  areas: [HomeArea],
});

app.listen();
```

在命令行运行

`deno run --allow-net app.ts`

---

# TODO

- [x] 增加模板渲染，支持[Dejs](https://github.com/syumai/dejs) 和[Handlebars](https://github.com/alosaur/handlebars)
- [x] 增加返回JSON类型的数据

- 增加装饰器:
- [x] `@Area`
- [x] `@QueryParam`
- [x] `@Param` param from url: `/:id`
- [x] `@Body`
- [x] `@Cookie`
- [x] `@Req`
- [x] `@Res`
- [x] `@Ctx`
- [x] `@Middleware` with regex route
- [x] `@UseHook` for contoller and actions
- [x] `@ResponseCache`

- [x] Support create custom decorators with app metadata

- [x] 增加中间件
- [x] 增加静态文件中间件 (例如: app.useStatic)
- [x] 增加CORS中间件
- [x] 增加SPA中间件
- [x] 增加依赖注入
- [x] 增加标准异常
- [x] 增加CI以及一些测试用例
- [x] 增加OpenAPI v3生成器 (参见 /examples/basic/openapi.ts)
- [ ] 增加OpenAPI类型引用
- [x] 增加钩子的例子
- [x] 增加WebSocket
- [x] 增加SSE
- [x] 增加类型校验的例子 [class-validator](https://github.com/typestack/class-validator)
- [x] 切换到Alosaur在github的组织
- [ ] 增加文档和更多的例子

- 插件与模块
  - [x] 增加[Angular](https://github.com/alosaur/angular_deno) 模板引擎
  - [x] 增加CLI及示意图(https://github.com/alosaur/alosaur-schematics)

## DI in Alosaur

> Note: For injects instances you should emitDecoratorMetadata for run servers

tsconfig.json:

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true
  }
}
```

Then run

```
deno run --allow-net --allow-read --config ./tsconfig.json app.ts
```

## 在alosaur中使用依赖注入

> 注意: 为了能够在aloaur中使用依赖注入，需要设置emitDecoratorMetadata为true

tsconfig.json:

```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true
  }
}
```

在运行时指定配置文件

```
deno run --allow-net --allow-read --config ./tsconfig.json app.ts
```

## OpenAPI v3

[范例](https://github.com/alosaur/alosaur/tree/master/basic/)

[引用类型解析的范例](https://github.com/alosaur/alosaur/tree/master/openapi/e2e/)

一个简单的例子:

```ts
AlosaurOpenApiBuilder.create(settings)
  .registerControllers()
  .addTitle("Basic Application")
  .addVersion("1.0.0")
  .addDescription("Example Alosaur OpenApi generate")
  .addServer({
    url: "http://localhost:8000",
    description: "Local server",
  })
  .saveToFile("./examples/basic/api.json");
```

生成OpenAPI文件:

```
deno run -A --config ./src/tsconfig.lib.json examples/basic/openapi.ts
```

为了支持类型引用，需要使用Deno的文档解析器解析JSDoc文档，范例如下:

```ts
// Parse controllers. Input path to your application
const docs = await AlosaurOpenApiBuilder.parseDenoDoc("./openapi/e2e/app.ts");

// create builder and add docs, then register controllers and add scheme components
const builder = AlosaurOpenApiBuilder.create(ProductAppSettings)
      .addDenoDocs(docs)
      .registerControllers()
      .addSchemeComponents()
      ...
```

怎样才能正确的使用JsDoc语法描述一个控制器？

需要使用JsDoc的装饰器，就像**@decorator**

> ECMAScript的装饰器有时是一个API规范的重要部分，然而现代TypeScript编译器不会再使用.d.ts输出装饰器代码，而是使用@decorator标签代表，这样就是的装饰器表达式可以放在程序代码的注释里面。
> https://tsdoc.org/pages/tags/decorator/

范例:

```ts
@Controller()
/**
 * Product控制器
 * @decorator Controller
 */
export class ProductController {
  /**
   * 通过id获取product
   * @summary 控制器方法测试
   * @remarks 太棒了！
   * @param {id} 产品id
   * @decorator Get
   */
  @Get("/:id")
  GetById(@Param("id") id: string) {
    return new Product();
  }
}
```

在JsDoc中还可以通过RequestBody参数，指定期望传入什么类型的media type

```ts
/**
   * 创建产品
   * @param product
   * @decorator Post
   * @RequestBody application/xml
   * @RequestBody application/json
   */
  @Post("/")
  Create(@Body() product: Product) {
  }
```

使用ProducesResponse装饰器指定从控制器方法返回的类型

```ts
/**
 * 根据id获取product
 * @summary 控制器方法测试
 * @remarks 太棒了！
 * @param {id} product id
 * @decorator Get
 */
@Get("/:id")
@ProducesResponse({ code: 200, type: Product, description: "Product found" })
@ProducesResponse({ code: 404, type: NotFoundResult, description: "Product has missing/invalid values" })
@ProducesResponse({ code: 500, description: "Oops! Can't create your product right now" })
GetById(@Param("id") id: string) {
  return new Product();
}
```

使用其他的JsDoc参数在类和模型中展示更多的信息

```ts
/**
 * product实体类
 */
export class Product {
  /**
   * @summary Identifer of code
   * @example 1
   */
  id?: number;

  /**
   * @summary Array of test case
   * @example [1,2,3]
   */
  arr?: number[];

  /**
   * @summary Type of product
   * @example {id:1}
   */
  type?: ProductType;

  /**
   * @maximum 100
   */
  count?: number;
}
```

Alosaur的openapi解析器目前支持一下的类型和表达式：

```ts
interface PropertyJsDocObject {
  title?: string;
  pattern?: string;
  multipleOf?: number;
  maximum?: number;
  minimum?: number;
  exclusiveMaximum?: boolean;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: boolean;
}
```

关键字:

```ts
export interface JsDocObject {
  example?: string;
  decorator?: string;
  default?: string;
  description?: string;
  deprecated?: boolean;
  required?: boolean;
  remarks?: string;
  summary?: string;
  format?: string;
  params?: string[];

  /**
   * Request body media type uses in controllers
   * application/json, application/xml, text/plain, etc
   * https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#requestBodyObject
   */
  RequestBody?: string[];
}
```

TypeScript类型,
`Object Date Symbol Map JSON RegExp String ArrayBuffer DataView Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array`

## 中间件

在模块或者程序的其他部分，可以创建并注册中间件

[完整的示例](https://github.com/alosaur/alosaur/tree/master/middlewares/)

```ts
@Middleware(new RegExp("/"))
export class Log implements MiddlewareTarget<TState> {
  date: Date = new Date();

  onPreRequest(context: Context<TState>) {
    return new Promise<void>((resolve, reject) => {
      this.date = new Date();
      resolve();
    });
  }

  onPostRequest(context: Context<TState>) {
    return new Promise<void>((resolve, reject) => {
      console.log(new Date().getTime() - this.date.getTime());
      resolve();
    });
  }
}
```

在应用程序的设置中进行注册

```ts
const settings: AppSettings = {
  areas: [HomeArea, InfoArea],
  middlewares: [Log], // 中间件按照数组元素的先后顺序执行
};
```

或者在app中直接使用

```ts
const app = new App(settings);

app.use(/\//, new Log());
```

### WebSocket中间件范例

使用 `context.response.setNotRespond()` 返回剩余的请求信息

[完整的示例](https://github.com/alosaur/alosaur/tree/master/examples/ws)

```ts
import { acceptWebSocket } from "https://deno.land/std@0.122.0/ws/mod.ts";
import { HttpContext, PreRequestMiddleware } from "https://deno.land/x/alosaur/mod.ts";

export class WebsocketMiddleware implements PreRequestMiddleware {
  onPreRequest(context: HttpContext) {
    const { conn, r: bufReader, w: bufWriter, headers } = context.request.serverRequest;

    acceptWebSocket({
      conn,
      bufReader,
      bufWriter,
      headers,
    })
      .then(ChatHandler) // execute chat
      .catch(async (e) => {
        console.error(`failed to accept websocket: ${e}`);
        await context.request.serverRequest.respond({ status: 400 });
      });

    context.response.setNotRespond(); // It is necessary to return the rest of the requests by standard
  }
}
```

### SSE中间件范例

使用 `context.response.setNotRespond()` 返回剩余的请求信息

[完整的示例](https://github.com/alosaur/alosaur/tree/master/examples/sse)

```ts
import { acceptSSE, HttpContext, PreRequestMiddleware } from "https://deno.land/x/alosaur/mod.ts";

export class SseMiddleware implements PreRequestMiddleware {
  async onPreRequest(context: HttpContext) {
    acceptSSE(context).then(ChatHandler) // execute chat
      .catch(async (e) => {
        console.error(`failed to accept sse: ${e}`);
        await context.request.serverRequest.respond({ status: 400 });
      });

    context.response.setNotRespond();
  }
}
```

## 钩子

钩子 - 模块、控制器和控制器方法的中间件，支持依赖注入容器

Alosaur中的钩子有三种类型: `onPreAction, onPostAction, onCatchAction`.

[完整的范例](https://github.com/alosaur/alosaur/tree/master/examples/hooks)

```typescript
type PayloadType = string; // payload可以是任意类型
type State = any;

export class MyHook implements HookTarget<State, PayloadType> {
  // 这个钩子在控制器方法之前执行
  onPreAction(context: Context<State>, payload: PayloadType) {
    // 可以在这里重写输出结果，设置response并立即生效
    context.response.result = Content({ error: { token: false } }, 403);
    context.response.setImmediately();
    // 如果response被设置成立即生效，那么不会有其他的操作被执行
  } // 这个钩子在控制器方法之后执行

  onPostAction(context: Context<State>, payload: PayloadType) {
    // 可以在这里过滤response的输出结果
  } // 这个钩子当控制器方法抛出异常的时候执行

  onCatchAction(context: Context<State>, payload: PayloadType) {
  }
}
```

用法:

```ts
@UseHook(MyContollerHook) // 或者使用 @UseHook(MyHook, 'payload') 为控制器的所有操作设置钩子
@Controller()
export class HomeController {
  @UseHook(MyHook, "payload") // 只为当前的控制器方法设置钩子
  @Get("/")
  text(@Res() res: any) {
    return ``;
  }
}
```

## 全局异常处理

没有在其他地方捕获的异常通过下面的方式进行处理

```ts
const app = new App(
  // app settings
);

// 添加全局异常处理
app.error((context: Context<any>, error: Error) => {
  context.response.result = Content(
    "This page unprocessed error",
    (error as HttpError).httpCode || 500,
  );
  context.response.setImmediately();
});
```

## 控制器方法的返回类型: Content, View, Redirect

控制器方法有三种返回类型

- **Content** 类似 `return {};` 默认会返回`200 OK`
- **View** 使用模板引擎渲染输出结果, `return View("index", model);`
- **Redirect** 和 **RedirectPermanent** 返回HTTP 301,302 `return Redirect('/to/page')`

[完整的范例](https://github.com/alosaur/alosaur/tree/master/src/renderer)

```ts
return {}; // 返回HTTP 200

// 或者
return Content("Text or Model", 404); // 返回HTTP 404

// 或者
return View("page", 404); // 返回HTTP 404
```

## 模板渲染

Alosaur支持任何HTML模板引擎. 你只需要在settings中定义一个渲染函数。 例如 [Dejs](https://github.com/alosaur/alosaur/tree/master/examples/dejs),
[Handlebars](https://github.com/alosaur/alosaur/tree/master/examples/handlebars),
[Angular](https://github.com/alosaur/angular_deno), [React](https://github.com/alosaur/react),
[Eta](https://github.com/alosaur/alosaur/tree/master/examples/eta)

```ts
// Handlebars
...
// Basedir path
const viewPath = `${Deno.cwd()}/examples/handlebars/views`;

// 创建Handlebars渲染引擎
const handle = new Handlebars();

app.useViewRender({
    type: 'handlebars',
    basePath: viewPath,
    getBody: async (path: string, model: any, config: ViewRenderConfig) => await handle.renderView(path, model),
});

...
```

可以为Handlebars进行配置, [more about handlebars for deno](https://github.com/alosaur/handlebars)

```ts
new Handlebars(
  {
    baseDir: viewPath,
    extname: ".hbs",
    layoutsDir: "layouts/",
    partialsDir: "partials/",
    defaultLayout: "main",
    helpers: undefined,
    compilerOptions: undefined,
  },
);
```

## HTML表单的multipart/form-data类型和文件上传

[完整的范例](https://github.com/alosaur/alosaur/tree/master/examples/form-data)

默认情况下使用在控制器方法中使用`@Body`解析通过HTML表单上传的文件.

```ts
import { FormFile } from "https://deno.land/std@0.122.0/mime/multipart.ts";
import { move } from "https://deno.land/std@0.122.0/fs/move.ts";

...

@Post()
async formData(@Body() body: { [key: string]: FormFile | string }) {
  const file: FormFile = body.file as FormFile;

  if (file) {
    const fileDest = "./examples/form-data/files/" + file.filename;

    // 如果在内存中有文件的缓存，那么把它写入到文件系统
    if (file.content) {
      await Deno.writeFile(fileDest, file.content!, { append: true });
    } else if (file.tempfile) {
      // 将上传的文件从临时文件中转移出来
      move(file.tempfile, fileDest);
    }

    return "Uploaded";
  }

  return "File not exist";
}
```

我们也可以在这个装饰器中使用自定义函数解析上传的文件 `@Body(NoopTransform, CustomBodyParser)`

```ts
const CustomBodyParser: RequestBodyParseOptions = {
  formData: {
    maxMemory: 100, // 解析器的缓存大小，默认为10mb
    parser: func, // 通过自定义函数解析上传的文件 (request: ServerRequest, contentType: string) => Promise<any>;
  },
};
```

## 转换器与验证器

我们可以使用各种不同的类转换器

例如可以使用`class-validator` 和 `class-transformer`

[完整范例](https://github.com/alosaur/alosaur/tree/master/examples/validator)

post.model.ts:

```ts
import validator from "https://jspm.dev/class-validator@0.8.5";

const { Length, Contains, IsInt, Min, Max, IsEmail, IsFQDN, IsDate } = validator;

export class PostModel {
  @Length(10, 20)
  title?: string;

  @Contains("hello")
  text?: string;

  @IsInt()
  @Min(0)
  @Max(10)
  rating?: number;

  @IsEmail()
  email?: string;
}
```

app.ts

```ts
import validator from "https://jspm.dev/class-validator@0.8.5";
import transformer from "https://jspm.dev/class-transformer@0.2.3";
import { App, Area, Body, Controller, Post } from "https://deno.land/x/alosaur/mod.ts";
import { PostModel } from "./post.model.ts";

const { validate } = validator;
const { plainToClass } = transformer;

// 创建控制器
@Controller()
export class HomeController {
  @Post("/")
  async post(@Body(PostModel) data: PostModel) {
    return {
      data,
      errors: await validate(data),
    };
  }
}

// 在模块中声明控制器
@Area({
  controllers: [HomeController],
})
export class HomeArea {}

// 创建应用程序
const app = new App({
  areas: [HomeArea],
});

// 添加转换函数
app.useTransform({
  type: "body", // parse body params
  getTransform: (transform: any, body: any) => {
    return plainToClass(transform, body);
  },
});

// 启动监听
app.listen();
```

也可以只使用一个函数，而不是转换器

```ts
function parser(body): ParsedObject {
    // your code
    return body;
}

...
@Post('/')
post(@Body(parser) data: ParsedObject) {

}
```

## 自定义装饰器

我们可以自定义装饰器，然后纳入依赖注入系统中

[完整范例](https://github.com/alosaur/alosaur/tree/master/examples/hooks)

钩子的范例:

```ts
import {
  BusinessType,
  container,
  Content,
  Context,
  getMetadataArgsStorage,
  HookTarget,
} from "https://deno.land/x/alosaur/mod.ts";

type AuthorizeRoleType = string | undefined;

/**
 * 通过角色进行授权的装饰器
 */
export function Authorize(role?: AuthorizeRoleType): Function {
  return function (object: any, methodName?: string) {
    // 在全局metadata中增加钩子
    getMetadataArgsStorage().hooks.push({
      type: methodName ? BusinessType.Action : BusinessType.Controller,
      object,
      target: object.constructor,
      method: methodName,
      instance: container.resolve(AutorizeHook),
      payload: role,
    });
  };
}

export class AutorizeHook implements HookTarget<unknown, AuthorizeRoleType> {
  onPreAction(context: Context<unknown>, role: AuthorizeRoleType) {
    const queryParams = getQueryParams(context.request.url);

    if (queryParams == undefined || queryParams.get("role") !== role) {
      context.response.result = Content({ error: { token: false } }, 403);
      context.response.setImmediately();
    }
  }
}
```

我们可以在任何地方使用你自定义的装饰器，例如在控制器函数中:

```ts
// ..控制器

  // 控制器函数
  @Authorize("admin")
  @Get("/protected")
  getAdminPage() {
    return "Hi! this protected info";
  }
```

## 捐赠者

<a  align="center" href="https://opencollective.com/libertyware-limited" target="_blank"><img src="https://images.opencollective.com/libertyware-limited/647a24a/logo/256.png" width="100"></a>

### 请支持我们！

<a href="https://opencollective.com/alosaur" target="_blank"><img src="https://opencollective.com/alosaur/backers.svg?width=1000"></a>
