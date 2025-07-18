pipeline {
    agent any

    environment {
        NODEJS_HOME = '/usr/bin/node'  # Путь к Node.js (или используйте Jenkins Tool)
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/ziolechka/nodejs-yarn-demo.git'
            }
        }

        stage('Setup Node.js') {
            steps {
                sh 'node --version'
                sh 'yarn --version'
            }
        }

        stage('Install & Test') {
            steps {
                sh 'yarn install'
                sh 'yarn test'
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
            archiveArtifacts artifacts: '**/node_modules/**', fingerprint: true  # (Опционально)
        }
    }
}
