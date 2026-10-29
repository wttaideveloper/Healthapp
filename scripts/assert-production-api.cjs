const apiVariableName = "EXPO_PUBLIC_API_BASE_URL";
const approvedProductionHostnames = new Set([
  "healthage.healthexporesources.com",
]);
const apiBaseUrl = (process.env[apiVariableName] ?? "").trim();

if (!apiBaseUrl) {
  console.error(`Missing ${apiVariableName}. Supply the production API URL through the release environment.`);
  process.exit(1);
}

let parsedUrl;
try {
  parsedUrl = new URL(apiBaseUrl);
} catch {
  console.error(`${apiVariableName} must be an absolute HTTPS URL.`);
  process.exit(1);
}

if (parsedUrl.protocol !== "https:") {
  console.error(`${apiVariableName} must use HTTPS.`);
  process.exit(1);
}

if (parsedUrl.username || parsedUrl.password) {
  console.error(`${apiVariableName} must not include URL credentials.`);
  process.exit(1);
}

const normalizedHostname = parsedUrl.hostname.toLowerCase();
if (!approvedProductionHostnames.has(normalizedHostname)) {
  console.error(`${apiVariableName} must use an approved production API hostname.`);
  process.exit(1);
}
