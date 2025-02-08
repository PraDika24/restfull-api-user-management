import type { Request, Response, NextFunction } from "express";


export const apiKeyMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const apiKey = req.get('X-API-Key');

    if (apiKey === Bun.env.API_KEY) {
        next();
        return;
    }

    res.status(403).json({
        error: "Forbidden"
    }).end();
    
}

// jika diterapkan seperti ini maka semua akan terkena middleware ini, karena targetnya adalahRequest yang merupakan parrent class

// publicRouter.use(apiKeyMiddleware); kode ini menyebabkannya

// publicRouter.post("/api/users", UserController.register);


// kode diatas agar bisa flexsibel tanpa harus rumah kode di api-keyMiddleware

// publicRouter.post("/api/users", apiKeyMiddleware, UserController.register); // dengan penerapan ini hanya ini saja yang terkena middleware ini
// publicRouter.post("/api/users/login", UserController.login);



// Bisa kode dibawah ini agar lebih kostumisasi

// export const apiKeyMiddleware = (enabled: boolean = true) => {
//     return async (req: Request, res: Response, next: NextFunction) => {
//         if (!enabled) {
//             return next(); // Jika middleware dimatikan, langsung lanjut ke route handler
//         }

//         const apiKey = req.get("X-API-Key");
//         if (apiKey === Bun.env.API_KEY) {
//             return next(); // Jika API key ada, lanjut ke route handler
//         }

//         res.status(403).json({ error: "Forbidden" });
//     };
// };


//maka routenya seperti ini

// publicRouter.post("/api/users", apiKeyMiddleware(true), UserController.register);
// publicRouter.post("/api/users/login", apiKeyMiddleware(false), UserController.login);