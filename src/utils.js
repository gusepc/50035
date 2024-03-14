import bcrypt, { genSaltSync } from "bcrypt"

export const createHash = password => bcrypt.hashSync(password, genSaltSync(10))
export const isValidatePassword = (user, password) => bcrypt.compareSync(password, user.password)
