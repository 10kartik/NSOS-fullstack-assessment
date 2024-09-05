class coreConstants {
  get apiDomain() {
    return process.env.REACT_APP_API_DOMAIN || "http://localhost:8080";
  }
}

const coreConstantsObj = new coreConstants();

export default coreConstantsObj;
