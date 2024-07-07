// https://www.devtools.tech/questions/s/how-to-implement-feature-flag-functionality-atlassian-frontend-interview-question---qid---af1JERRj92CZPrEyLl5z?utm_source=social-share

/**
 * Read FAQs section on the left for more information on how to use the editor
 **/
const SAMPLE_FEATURES = {
  show_dialog_box: true,
  enable_new_pricing: true,
};

let cache = {};
let cacheTimestamp = null;

let fetchAllFeaturesPromise = null;

const MAX_FF_CACHE_TTL = 10000;

// returns the state of *all* features for the current user
function fetchAllFeatures() {
  // mocking the fetch API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(SAMPLE_FEATURES), 100);
  });
}

// DO NOT CHANGE THE FUNCTION NAME
function getFeatureState(featureName, defaultValue) {
  if (cacheTimestamp && Date.now() - cacheTimestamp < MAX_FF_CACHE_TTL) {
    return Promise.resolve(cache[featureName] ?? defaultValue);
  }

  if (fetchAllFeaturesPromise instanceof Promise) {
    return fetchAllFeaturesPromise
      .then((featureFlags) =>
        Promise.resolve(featureFlags[featureName] ?? defaultValue)
      )
      .catch((error) => Promise.resolve(defaultValue));
  }

  fetchAllFeaturesPromise = fetchAllFeatures();

  return fetchAllFeaturesPromise
    .then((featureFlags) => {
      cache = featureFlags;
      cacheTimestamp = Date.now();

      return Promise.resolve((featureFlags) =>
        Promise.resolve(featureFlags[featureName] ?? defaultValue)
      );
    })
    .catch((error) => {
      return Promise.resolve(defaultValue);
    })
    .finally(() => {
      fetchAllFeaturesPromise = null;
    });
}

getFeatureState("show-pricing-v2").then(function (isEnabled) {
  if (isEnabled) {
    showPricingV2();
  } else {
    showOldPricing();
  }
});

getFeatureState("show-redesigned-dialog").then(function (isEnabled) {
  if (isEnabled) {
    showRedesignedDialog();
  }
});
