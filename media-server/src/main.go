package main

import (
	"media-server/src/controllers"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/media/:file", controllers.GetVideoFile)

	router.Run("0.0.0.0:9000")
}
