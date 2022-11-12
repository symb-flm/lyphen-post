import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const { DatabaseControler } = require("/controller/DatabaseControler.js")
const { User } = require('/Model/User')
const { compare } = require("bcryptjs")

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorise(credentials, req) {
        DatabaseControler.connect()
        const user = await User.findOne({ email: credentials.email })
        if (!user) throw new Error("User not found")

        const checkPassword = await compare(credentials.password, user.password)

        if (!checkPassword || credentials.email != user.email) throw new Error("Username Or Password doesn't match")

        return user
      }
    })
  ]
})