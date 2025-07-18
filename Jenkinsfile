pipeline {
    agent any

    tools {
        // Если используется Jenkins Tool (рекомендуемый способ)
        nodejs 'NodeJS 24.4.1'  // Должно совпадать с именем инструмента в настройках Jenkins
    }

    environment {
        // Альтернативный вариант, если не используется Jenkins Tool
        // NODEJS_HOME = tool name: 'NodeJS-20', type: 'nodejs'  // Для plugin NodeJS
        // PATH = "${env.NODEJS_HOME}/bin:${env.PATH}"  // Добавляем в PATH
        YARN_CACHE_FOLDER = "${env.WORKSPACE}/.yarn-cache"  // Кэш для Yarn
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                sh '''
                    echo "Node.js version:"
                    node --version
                    echo "Yarn version:"
                    yarn --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'yarn install --frozen-lockfile --prefer-offline'
            }
        }

        stage('Test') {
            steps {
                sh 'yarn test'
            }
            post {
                always {
                    junit '**/junit.xml'  // Если jest настроен на вывод JUnit
                    archiveArtifacts artifacts: 'test-results/**/*'  // Артефакты тестов
                }
            }
        }

        stage('Build') {
            steps {
                sh 'yarn build'  // Если есть скрипт build в package.json
            }
        }

        stage('Archive') {
            steps {
                archiveArtifacts artifacts: 'dist/**/*'  // Если сборка в папку dist
            }
        }
    }

    post {
        always {
            cleanWs()  // Очистка workspace
        }
    }
}
