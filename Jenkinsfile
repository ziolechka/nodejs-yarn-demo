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
                    echo "Node.js version:"
                    node --version
                    echo "Yarn version:"
                    yarn --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'yarn install --frozen-lockfile'
            }
        }

        stage('Test') {
            steps {
                sh 'yarn test:ci'
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
    }
}
stage('Verify Test Results') {
    steps {
        sh '''
            echo "Checking test results..."
            ls -la test-results/
            [ -f test-results/junit.xml ] || exit 1
        '''
    }
}
