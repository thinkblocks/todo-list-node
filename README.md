# Todo-list-node
This project provides TODO task management service leveraging AWS cloud for deployment.

## Description
This project provides two functionalities for task management

1.  Create a task record
2.  Find all or a specific task record

The database type that this project is using is `Key Value`, which is adapted by `DynamoDB` service provided by AWS.

## Accompanied Functionalities 
Following are the two functionalities that are provided by this service.
### Create TODO:
This functionality creates a TODO task inside the table todos.
The task follows following object structure:
```
{
    id: UUID,
    title: string,
    task:  string
}
```
The input to the create functionality should follow the above body where id is automatically assigned by the system, as unique id.

### Find TODO:
This functionality searches for the matching input.
The input to this functionality follows the following object structure
```
{
    id: <string>
}
```
If no id has been provided, this functionlity will return all TODO's and else matching TODO is returned.


## Prerequisites
- Node JS
- Lint
- Jest
- Serverless framework
- Make
- AWS SDK

## Project Initialization
Following are the steps that are to be taken before we move towards using the service

1.  Execute the ``` npm install ``` command to install the dependencies.
2.  Make sure we have all the dependencies installed without error.
3.  Follow with the `Usage` which takes you through the steps of using the service.
## Usage
1.  Have AWS Access configured on Local.
2.  The user deploying over AWS should have access over following resources:
    
    1.  DynamoDB
    2.  Lambda
    3.  Cloudwatch
    4.  Cloudformation
    5.  S3

3.  Once we have the AWS user configured, we need to select the environment for deployment, from among the listed.
    
    1.  Dev (Development)
    2.  Stg (Staging (UAT))
    3.  Prod (Production)

4.  After we have selected the environment to deploy, one of the following commands could be used to deploy to it:
    -  Development environment deployemnt: 
        ```
        make dev
        ```

    -  Staging environment deployemnt: 
        ```
        make stg
        ```
    
    -  Production environment deployemnt: 
        ```
        make prod
        ```

5.  We can test the lambda by invoking the lambda from AWS console or using the Serverless framework itself that could help testing the function on local.
    
    Command to invoke the function over local machine is as follows:
    ```
    serverless invoke --function <createTODO | findTODOS> --data <DATA>
    ```

    Command to invoke a AWS deployed function is as follows
    ```
    aws lambda invoke --function-name '<todo-management-find-todo-resource | todo-management-create-todo-resource>' --payload '{}' <Custom response file name | response.json>
    ```
### How to collaborate?
Following are the steps that are to be taken for collaboration to this repository.
1.  Make sure that you have access to the repository.
2.  Download the repository from the https://github.com/thinkblocks/todo-list-node.git.
3.  Create a branch following the format of `<feature | bug | fix/<feature name | fix name | bug name>>`.
4.  Implement the feature/bug/fix etc.
5.  Create a pull request.
6.  Precautions
    
    - Make sure that linting errors are removed
    - Make sure the implementation follows TDD development strategy
    - Make sure all functionality tests are passed
