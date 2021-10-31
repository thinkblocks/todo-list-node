const handlers = require('../src/index')

describe('Create TODO Test', () => {
    const testing = true
    it(
        'When passed with todo task details, then task is created in dynamodb and response is with success code', 
        async () => {
            const todoInputBody = {
                title: 'title',
                task: 'task'
            }
            const response = await handlers.createTodo(
                todoInputBody
            )
            expect(response.code).toBe(200)
        }
    )
})

describe('Create TODO Failure Test', () => {
    const testing = true
    it(
        'When passed with empty todo task body, then task is not created in dynamodb and response is with failure code', 
        async () => {
            const todoInputBody = {}
            const response = await handlers.createTodo(
                todoInputBody
            )
            expect(response.code).toBe(422)
        }
    )
    it(
        'When passed with partial todo task body, then task is not created in dynamodb and response is with failure code', 
        async () => {
            const todoInputBody = {
                title: 'title'
            }
            const response = await handlers.createTodo(
                todoInputBody
            )
            expect(response.code).toBe(422)
        }
    )
})


describe('Search TODOS Test', () => {
    const testing = true
    it(
        'When passed with a selective id of the task, then task is found in dynamodb and response is returned with task', 
        async () => {
            const todoInputBody = {
                'id': '7ac8b3b7-ca19-49b4-a6e8-0c702efbb4de'
            }
            const response = await handlers.findMatchingTodos(
                todoInputBody
            )
            expect(response.code).toBe(200)
            if(response.data?.id){
                expect(response.data?.id?.S).toBe('7ac8b3b7-ca19-49b4-a6e8-0c702efbb4de')
            }
            
        }
    )
    it(
        'When passed no id, then all tasks found in dynamodb are returned', 
        async () => {
            const todoInputBody = {}
            const response = await handlers.findMatchingTodos(
                todoInputBody
            )
            expect(response.code).toBe(200)
            expect(response.data?.length >= 0).toBeTruthy()
        }
    )
})