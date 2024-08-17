pipeline {
    agent any
<<<<<<< HEAD

    environment {
        DB_USER = 'postgres'
        DB_PASSWORD = 'Jrock007'
        DB_NAME = 'mytypensight'
        DB_HOST = 'localhost'
        API_BASE_URL = 'https://api.worldbank.org/v2'
        SONAR_HOST_URL = 'http://localhost:9000'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/your-repository.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'pip install -r requirements.txt'
            }
        }

        stage('Data Collection') {
            steps {
                script {
                    sh 'python collect_world_bank_data.py'
                }
            }
        }

        stage('Data Processing') {
            steps {
                script {
                    sh 'python process_world_bank_data.py'
                }
            }
        }

        stage('Data Insertion') {
            steps {
                script {
                    sh 'python insert_data_to_db.py'
                }
            }
        }

        stage('Post-Processing') {
            steps {
                script {
                    // Post-processing tasks like sending notifications
=======
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
>>>>>>> 080e6c169d387e711f44b843c22bfa123dfd43ff
                }
            }
        }
    }
<<<<<<< HEAD

    post {
        always {
            archiveArtifacts artifacts: '**/logs/*.log', allowEmptyArchive: true
        }
        success {
            echo 'Data collection and insertion completed successfully.'
        }
        failure {
            echo 'Pipeline failed!'
=======
    post {
        always {
            echo 'Pipeline completed.'
>>>>>>> 080e6c169d387e711f44b843c22bfa123dfd43ff
        }
    }
}
