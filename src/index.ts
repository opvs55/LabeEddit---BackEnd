import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { userRouter } from "./Router/UserRouter"
import { postRouter } from "./Router/PostRouter"
import { subPostRouter } from "./Router/SubPostRouter"


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())


app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`)
})

app.use("/users", userRouter)
app.use("/post", postRouter)
app.use("/post", subPostRouter)  