FedHenry App Forms Template App v3
-------------------------------
This template app is automatically configured via the App Studio.

This app uses the $fh.forms APIs to perform the majority of forms related work. The app UI presentation (with the exception of the form view rendering) is controlled by this app. All communication with the mBaaS, form storage, validation and transmission is performed by the $fh.forms API. 


To build:

    grunt

Produces a dist folder and dist.zip. To copy to dist branch:

    git checkout phase3
    git pull origin phase3
    grunt
    git checkout phase3-dist
    git pull origin phase3-dist
    cp -r dist/* ./
    # git commit the changed files
    git push origin phase3-dist

NOTE: make sure that you have added all files you need and not added any 
unecessary one!

To just lint scripts:

    grunt lint

To test a release candidate run the following : 
   grunt
   cp dist.zip candidate.zip
   zip candidate cloud/wufoo_config.js

Then import the candidate.zip into the studio, build and test it.
