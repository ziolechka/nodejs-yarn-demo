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
                    echo "Node.js version: $(node --version)"
                    echo "Yarn version: $(yarn --version)"
                    echo "Installing dependencies..."
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
                    mkdir -p test-results
                    yarn test:ci || echo "Tests failed but continuing pipeline"
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
            cleanWs()
        }
        failure {
            emailext body: 'Build failed: ${BUILD_URL}',
                    subject: 'FAILED: ${JOB_NAME} - Build #${BUILD_NUMBER}',
                    to: 'team@example.com'
        }
    }
}
