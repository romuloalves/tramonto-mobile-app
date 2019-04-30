package com.tramontoone;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import tramonto.*;

class OneCallback implements tramonto.Callback {
    private ReactApplicationContext context;
    private String eventName;

    public OneCallback(ReactApplicationContext context, String eventName) {
        this.context = context;
        this.eventName = eventName;
    }

    @Override
    public void invoke(String data) {
        if (this.context == null) {
            return;
        }

        this.context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, data);
    }
}

public class TramontoOneModule extends ReactContextBaseJavaModule {
    // Tramonto One instance
    private tramonto.TramontoOne node;

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
        try {
            // Initializes the repo
            this.node = Tramonto.newTramontoOne(repoPath);
        } catch (Exception err) {
            callback.invoke("Error initializing Tramonto One: " + err.getMessage());
        }

        try {
            // Setups the project (init repo and database)
            this.node.setup();
        } catch (Exception err) {
            callback.invoke("Error in the setup of node: " + err.getMessage());
        }

        callback.invoke();
    }

    @ReactMethod
    /* Returns a list of tests */
    public void getTests(Callback callback) {
        try {
            if (this.node == null) {
                throw new Error("Node not started.");
            }

            byte[] tests = this.node.getTests();

            callback.invoke(null, new String(tests, "UTF-8"));

            return;
        } catch (Exception err) {
            callback.invoke("Error getting tests: " + err.getMessage());
        }
    }

    @ReactMethod
    /* Creates a new test */
    public void createTest(String name, String description, Callback callback) {
        try {
            if (this.node == null) {
                throw new Error("Node not started.");
            }

            byte[] response = this.node.createTest(name, description);

            callback.invoke(null, new String(response, "UTF-8"));

            return;
        } catch (Exception err) {
            callback.invoke("Error creating test: " + err.getMessage());
        }
    }

    @ReactMethod
    /* Returns a test by its IPFS hash */
    public void getTestByIpfs(String ipfsHash, String secret, Callback callback) {
        try {
            if (this.node == null) {
                throw new Error("Node not started.");
            }

            byte[] test = this.node.getTestByIPFS(ipfsHash, secret);

            callback.invoke(null, new String(test, "UTF-8"));

            return;
        } catch (Exception err) {
            callback.invoke("Error getting test: " + err.getMessage());
        }
    }

    @ReactMethod
    /* Returns a test by its IPNS hash */
    public void getTestByIpns(String ipnsHash, String secret, Callback callback) {
        try {
            if (this.node == null) {
                throw new Error("Node not started.");
            }

            byte[] test = this.node.getTestByIPNS(ipnsHash, secret);

            callback.invoke(null, new String(test, "UTF-8"));

            return;
        } catch (Exception err) {
            callback.invoke("Error getting test: " + err.getMessage());
        }
    }

    @ReactMethod
    /* Publishes a test to IPNS */
    public void publishToIpns(String ipfsHash, String testName, Callback callback) {
        try {
            if (this.node == null) {
                throw new Error("Node not started.");
            }

            String publishesIpns = this.node.shareTest(ipfsHash, testName);

            callback.invoke(null, publishesIpns);
        } catch (Exception err) {
            callback.invoke("Error publishing test: " + err.getMessage());
        }
    }

    @ReactMethod
    /* Async */
    public void test(String ipfsHash, String testName, Callback callback) {
        try {
            if (this.node == null) {
                throw new Error("Node not started.");
            }

            OneCallback cb = new OneCallback(
                    this.getReactApplicationContext(),"shareTestAsync");

            this.node.shareTestAsync(ipfsHash, testName, cb);
        } catch (Exception err) {
            callback.invoke("Error publishing test async: " + err.getMessage());
        }
    }
}