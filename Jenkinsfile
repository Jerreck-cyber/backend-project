pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/Jerreck-cyber/backend-project.git', branch: 'main'
            }
        }
        stage('Build') {
            steps {
                sh 'echo Building the project...'
                // Add your actual build commands here, e.g., npm install, mvn clean install, etc.
            }
        }
        stage('Test') {
            steps {
                sh 'echo Running tests...'
                // Add your actual test commands here, e.g., npm test, mvn test, etc.
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('MySonarQube Server') {
                    sh 'mvn clean verify sonar:sonar'
                    // Replace 'mvn clean verify sonar:sonar' with your actual SonarQube command if using something other than Maven.
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline completed.'
        }
    }
}
