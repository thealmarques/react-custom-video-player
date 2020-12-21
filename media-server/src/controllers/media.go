package controllers

import "github.com/gin-gonic/gin"

// GetVideoFile - Returns media file
func GetVideoFile(ctx *gin.Context) {
	file := ctx.Param("file")

	ctx.File("src/resources/video/" + file)
}
