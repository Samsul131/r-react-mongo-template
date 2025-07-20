# plumber.R

library(plumber)
library(mongolite)

# Koneksi ke MongoDB
con <- mongo(collection = "users", db = "testdb", url = "mongodb://localhost:27017")

#* @apiTitle R API dengan MongoDB

#* @get /users
getAllUsers <- function() {
  return(con$find())
}

#* @post /users
#* @param name
#* @param age
insertUser <- function(name, age) {
  con$insert(list(name = name, age = as.integer(age)))
  return(list(status = "success", name = name, age = age))
}

#* @get /summary
getSummary <- function() {
  df <- con$find()
  summary <- summary(df$age)
  return(as.list(summary))
}
