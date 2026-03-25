# Add project specific ProGuard rules here.
# Keep Capacitor classes
-keep class com.getcapacitor.** { *; }
-dontwarn com.getcapacitor.**
-keep class com.legalease.app.** { *; }

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

# Keep Parcelable class members
-keepclassmembers class * implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator CREATOR;
}

# Keep Serializable class members
-keepclassmembers class * implements java.io.Serializable {
    static final long serialVersionUID;
    private static final java.io.ObjectStreamField[] serialPersistentFields;
    private void writeObject(java.io.ObjectOutputStream);
    private void readObject(java.io.ObjectInputStream);
    java.lang.Object writeReplace();
    java.lang.Object readResolve();
}

# WebView
-keepclassmembers class fqcn.of.javascript.interface.for.webview {
    public *;
}
