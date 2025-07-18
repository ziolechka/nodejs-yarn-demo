pipeline {
    agent any

    tools {
        nodejs 'NodeJS_24.4.1' // Должно совпадать с именем в настройках Jenkins
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
                sh '''
                    yarn test --ci --testResultsProcessor="jest-junit"
                '''
            }
            post {
                always {
                    junit 'junit.xml' // Теперь отчет будет создаваться в корне проекта
                }
            }
        }

        stage('Build') {
            steps {
                sh 'yarn build'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
