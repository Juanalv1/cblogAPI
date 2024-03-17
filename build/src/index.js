"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const posts_1 = require("./routes/posts");
const categories_1 = require("./routes/categories");
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cors_1.default)({
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
const PORT = 3001;
app.get('/', (_req, res) => {
    res.send('Hello World!');
});
app.use('/api/v1/posts', posts_1.postsRouter);
app.use('/api/v1/categories', categories_1.categoriesRouter);
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});
