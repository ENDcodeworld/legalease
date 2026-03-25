apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply from: 'capacitor.build.gradle'

android {
    defaultConfig {
        applicationId "com.legalease.app"
        versionCode 1
        versionName "0.1.0"
        minSdkVersion 22
        targetSdkVersion 34
        compileSdkVersion 34
        ndk {
            abiFilters 'armeabi-v7a', 'arm64-v8a', 'x86_64'
        }
        vectorDrawables {
            useSupportLibrary true
        }
    }
    
    buildTypes {
        debug {
            debuggable true
            minifyEnabled false
            shrinkResources false
            signingConfig signingConfigs.debug
        }
        release {
            debuggable false
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.release
        }
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
    
    kotlinOptions {
        jvmTarget = '17'
    }
    
    sourceSets {
        main.java.srcDirs += 'src/main/kotlin'
    }
    
    packagingOptions {
        pickFirst '**/libc++_shared.so'
        pickFirst '**/libjsc.so'
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlinVersion"
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'androidx.core:core-ktx:1.12.0'
    implementation 'androidx.legacy:legacy-support-v4:1.0.0'
    implementation 'com.google.android.material:material:1.11.0'
    implementation "com.getcapacitor:capacitor-android:6.0.0"
    
    // WebView
    implementation 'androidx.webkit:webkit:1.8.0'
}

capacitor {
    // Capacitor 配置
    entryFile = "index.html"
    serverUrl = "http://localhost:3000"
}
