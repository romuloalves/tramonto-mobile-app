package com.tramontoone;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.io.File;

import tramonto.*;

public class TramontoOneModule extends ReactContextBaseJavaModule {
    // Path of the repo
    String path = "";

    // Tramonto One node instance
    tramonto.TramontoOne node;

    public TramontoOneModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "TramontoOne";
    }

    @ReactMethod
    /* Starts the Tramonto One repo */
    public void startRepo(String repoPath, Callback callback) {
        String ipfsPath = new File(repoPath, ".ipfs").toString();

        try {
            // Initializes the repo
            Tramonto.initRepo(ipfsPath);
        } catch (Exception err) {
            callback.invoke("Error initializing repo: " + err.getMessage());
        }
        try {
            // Initializes the repo
            this.node = Tramonto.newTramontoOne(ipfsPath);

            // Stores the repo path
            this.path = ipfsPath;
        } catch (Exception err) {
            callback.invoke("Error creating the node: " + err.getMessage());
        }

        try {
            // Starts the repo
            this.node.start();
        } catch (Exception err) {
            callback.invoke("Error starting the node: " + err.getMessage());
        }

        callback.invoke();
    }
}
