# dcpMobile
dcp mobile 4.0

# Run Cheatsheet:

npm run android:development -> cloud <br />
npm run android:production <br />
npm run android:staging <br />


npm run ios:development -> cloud <br />
npm run ios:production <br />
npm run ios:staging <br />


# Branch guidance
Mobile:

Main Branch:
master -> *active development* (for dcp5.0)
master-v4 -> (for dcp4.0 + bug fix)

CI/CD triggers branch:
deploy -> deploy branch *master*
delpoy-v4 -> deploy branch *master-v4*
