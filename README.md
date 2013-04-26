FedHenry Wufoo Template App v2
-------------------------------
This template app is automatically configured via the App Studio.

To build:

    grunt

Produces a dist folder and dist.zip. To copy to dist branch:

    git checkout phase2
    git pull origin phase2
    grunt
    git checkout phase2-dist
    git pull origin phase2-dist
    cp -r dist/* ./
    # git commit the changed files
    git push origin phase2-dist

NOTE: make sure that you have added all files you need and not added any 
unecessary one!

To just lint scripts:

    grunt lint

To test a release candidate run the following : 
   grunt
   cp dist.zip candidate.zip
   zip candidate cloud/wufoo_config.js

Then import the candidate.zip into the studio, build and test it.

To run some/all of the buster cloud tests :

   reset && clear && buster test --node
   reset && clear && buster test --test cloud/spec/GetFormSpec.js 