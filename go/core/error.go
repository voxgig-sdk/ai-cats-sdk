package core

type AiCatsError struct {
	IsAiCatsError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewAiCatsError(code string, msg string, ctx *Context) *AiCatsError {
	return &AiCatsError{
		IsAiCatsError: true,
		Sdk:              "AiCats",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *AiCatsError) Error() string {
	return e.Msg
}
