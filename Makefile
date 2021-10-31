.PHONY: install_dependencies
install_dependencies:
	npm install

.PHONY: fix_vulnerability
fix_vulnerability:
	npm audit fix

.PHONY: test
test:
	npm run test

.PHONY: lint
lint:
	npm run lint

.PHONY: dev
dev:
	npm run lint
	npm run test
	serverless deploy --stage dev

.PHONY: stg
stg:
	npm run lint
	npm run test
	serverless deploy --stage stg

.PHONY: prod
prod:
	npm run lint
	npm run test
	serverless deploy --stage prod