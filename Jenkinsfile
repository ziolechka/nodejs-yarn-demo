pipeline {
    agent any

    tools {
        nodejs 'NodeJS 24.4.1'
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
                    echo "Node.js: $(node --version)"
                    echo "Yarn: $(yarn --version)"
                '''
            }
        }

        stage('Install') {
            steps {
                sh 'yarn install --frozen-lockfile'
            }
        }

        stage('Test') {
            steps {
                sh '''
                    echo "Creating test-results directory..."
                    mkdir -p test-results
                    echo "Running tests..."
                    yarn test:ci
                    echo "Checking test results..."
                    ls -la test-results/
                '''
            }
            post {
                always {
                    junit 'test-results/junit.xml'
                    archiveArtifacts artifacts: 'test-results/*.xml'
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
            sh 'ls -la'  // Для диагностики
            cleanWs()
        }
    }
}
