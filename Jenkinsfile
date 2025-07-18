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
                    mkdir -p test-results
                    yarn test:ci
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
                sh 'yarn build || echo "Build step skipped"'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
