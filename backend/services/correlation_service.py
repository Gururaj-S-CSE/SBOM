import os
import json
from services.parser import parse_sbom
from services.vulnerability_service import check_vulnerabilities
from services.license_checker import check_licenses
from services.maintenance_checker import check_maintenance

# Default SBOM component templates by application ID
DEFAULT_COMPONENTS = {
    "APP-001": [
        {"name": "gomock", "version": "5.3.0", "type": "library", "licenses": [{"license": {"id": "BSD-3-Clause"}}]},
        {"name": "jackson-databind", "version": "2.12.0", "type": "library", "licenses": [{"license": {"id": "Apache-2.0"}}]},
        {"name": "lombok", "version": "1.18.24", "type": "library", "licenses": [{"license": {"id": "MIT"}}]}
    ],
    "APP-002": [
        {"name": "jackson-databind", "version": "2.12.0", "type": "library", "licenses": [{"license": {"id": "Apache-2.0"}}]},
        {"name": "lombok", "version": "1.18.24", "type": "library", "licenses": [{"license": {"id": "MIT"}}]},
        {"name": "fasthttp", "version": "1.40.0", "type": "library", "licenses": [{"license": {"id": "MIT"}}]}
    ],
    "APP-003": [
        {"name": "flask", "version": "2.2.0", "type": "library", "licenses": [{"license": {"id": "BSD-3-Clause"}}]},
        {"name": "numpy", "version": "1.21.0", "type": "library", "licenses": [{"license": {"id": "BSD-3-Clause"}}]},
        {"name": "requests", "version": "2.28.1", "type": "library", "licenses": [{"license": {"id": "Apache-2.0"}}]}
    ],
    "APP-004": [
        {"name": "django", "version": "4.0.0", "type": "library", "licenses": [{"license": {"id": "BSD-3-Clause"}}]},
        {"name": "requests", "version": "2.28.1", "type": "library", "licenses": [{"license": {"id": "Apache-2.0"}}]},
        {"name": "click", "version": "8.0.0", "type": "library", "licenses": [{"license": {"id": "BSD-3-Clause"}}]}
    ],
    "APP-005": [
        {"name": "lodash", "version": "4.17.20", "type": "library", "licenses": [{"license": {"id": "MIT"}}]},
        {"name": "express", "version": "4.17.1", "type": "library", "licenses": [{"license": {"id": "MIT"}}]},
        {"name": "axios", "version": "0.21.1", "type": "library", "licenses": [{"license": {"id": "MIT"}}]}
    ],
    "APP-006": [
        {"name": "gin", "version": "1.7.0", "type": "library", "licenses": [{"license": {"id": "MIT"}}]},
        {"name": "gorm", "version": "1.20.0", "type": "library", "licenses": [{"license": {"id": "MIT"}}]},
        {"name": "go-jwt", "version": "3.2.0", "type": "library", "licenses": [{"license": {"id": "MIT"}}]}
    ],
    "APP-007": [
        {"name": "requests", "version": "2.28.1", "type": "library", "licenses": [{"license": {"id": "Apache-2.0"}}]},
        {"name": "click", "version": "8.0.0", "type": "library", "licenses": [{"license": {"id": "BSD-3-Clause"}}]},
        {"name": "scipy", "version": "1.7.0", "type": "library", "licenses": [{"license": {"id": "BSD-3-Clause"}}]}
    ],
    "APP-008": [
        {"name": "gomock", "version": "5.3.0", "type": "library", "licenses": [{"license": {"id": "BSD-3-Clause"}}]},
        {"name": "log4j-api", "version": "2.15.0", "type": "library", "licenses": [{"license": {"id": "Apache-2.0"}}]},
        {"name": "jackson-core", "version": "2.12.0", "type": "library", "licenses": [{"license": {"id": "Apache-2.0"}}]}
    ],
    "APP-009": [
        {"name": "lodash", "version": "4.17.20", "type": "library", "licenses": [{"license": {"id": "MIT"}}]},
        {"name": "express", "version": "4.17.1", "type": "library", "licenses": [{"license": {"id": "MIT"}}]}
    ],
    "APP-010": [
        {"name": "gin", "version": "1.7.0", "type": "library", "licenses": [{"license": {"id": "MIT"}}]},
        {"name": "fasthttp", "version": "1.40.0", "type": "library", "licenses": [{"license": {"id": "MIT"}}]}
    ]
}

def initialize_default_sboms(upload_folder):
    """
    Pre-populates the upload_folder with default mock CycloneDX SBOM files
    for all 10 apps, ensuring correlation functionality works instantly.
    """
    os.makedirs(upload_folder, exist_ok=True)
    
    for app_id, components in DEFAULT_COMPONENTS.items():
        file_path = os.path.join(upload_folder, f"{app_id}.json")
        if not os.path.exists(file_path):
            # Create a simple CycloneDX representation
            sbom_data = {
                "bomFormat": "CycloneDX",
                "specVersion": "1.4",
                "version": 1,
                "components": components,
                "dependencies": []
            }
            with open(file_path, "w") as f:
                json.dump(sbom_data, f, indent=2)

def get_cross_system_correlations(upload_folder):
    """
    Aggregates component usage and lists vulnerabilities across all applications.
    """
    # Load all applications
    app_path = os.path.join(os.path.dirname(__file__), "..", "sample_data", "applications.json")
    with open(app_path, "r") as f:
        applications = json.load(f)
        
    dependencies_map = {}
    app_vulnerability_summary = {}

    severity_priority = {"CRITICAL": 4, "HIGH": 3, "MEDIUM": 2, "LOW": 1, "NONE": 0}

    for app in applications:
        app_id = app["app_id"]
        file_path = os.path.join(upload_folder, f"{app_id}.json")
        
        if not os.path.exists(file_path):
            continue
            
        parsed = parse_sbom(file_path)
        components = parsed["components"]
        
        # Analyze vulnerabilities for this app's components
        vuln_results = check_vulnerabilities(components)
        
        # Analyze licenses
        licenses = check_licenses(components)
        high_risk_licenses = sum(1 for l in licenses if l["risk"] in ["HIGH", "CRITICAL"])
        gpl_found = any("gpl" in str(l["license"]).lower() for l in licenses)
        
        # Analyze maintenance status
        maintenance = check_maintenance(components)
        unmaintained_count = sum(1 for m in maintenance if m["maintenance"] == "UNMAINTAINED")
        
        total_vulns = 0
        high_critical_vulns = 0
        vulnerable_packages_count = 0
        
        for res in vuln_results:
            comp_name = res["component"]
            version = res["version"]
            has_vulns = res["has_vulnerabilities"]
            vulns = res["vulnerabilities"]
            
            cve_ids = [v["cve_id"] for v in vulns]
            total_vulns += len(vulns)
            if has_vulns:
                vulnerable_packages_count += 1
            
            # Determine highest severity for this package
            max_sev = "NONE"
            if vulns:
                sevs = [v.get("severity", "LOW") for v in vulns]
                max_sev = max(sevs, key=lambda s: severity_priority.get(s, 0))
                high_critical_vulns += sum(1 for v in vulns if v.get("severity") in ["HIGH", "CRITICAL"])
            
            # Add to global dependencies map
            key = comp_name.lower()
            if key not in dependencies_map:
                dependencies_map[key] = {
                    "name": comp_name,
                    "vulnerable": has_vulns,
                    "severity": max_sev,
                    "cves": cve_ids,
                    "apps": []
                }
            else:
                # Update severity if this one has higher severity
                current_sev = dependencies_map[key]["severity"]
                if severity_priority.get(max_sev, 0) > severity_priority.get(current_sev, 0):
                    dependencies_map[key]["severity"] = max_sev
                # Merge unique CVEs
                existing_cves = set(dependencies_map[key]["cves"])
                existing_cves.update(cve_ids)
                dependencies_map[key]["cves"] = list(existing_cves)
                
            dependencies_map[key]["apps"].append({
                "app_id": app_id,
                "app_name": app["name"],
                "version": version
            })

        # Calculate Compliance Score (starts at 100%, drops based on risks)
        score = 100
        score -= min(vulnerable_packages_count * 15, 50)
        score -= min(high_risk_licenses * 15, 30)
        score -= min(unmaintained_count * 10, 20)
        if gpl_found:
            score -= 10
        score = max(0, min(100, score))

        app_vulnerability_summary[app_id] = {
            "app_id": app_id,
            "app_name": app["name"],
            "criticality": app["criticality"],
            "business_owner": app["business_owner"],
            "total_dependencies": len(components),
            "total_vulnerabilities": total_vulns,
            "high_critical_vulnerabilities": high_critical_vulns,
            "license_compliant": high_risk_licenses == 0,
            "vulnerable_packages_count": vulnerable_packages_count,
            "unmaintained_packages_count": unmaintained_count,
            "gpl_found": gpl_found,
            "compliance_score": score
        }

    # Convert dependencies map to a list sorted by package name
    all_packages = sorted(list(dependencies_map.values()), key=lambda x: x["name"].lower())
    
    # Filter shared vulnerable dependencies
    shared_vulnerable = [
        pkg for pkg in all_packages 
        if pkg["vulnerable"] and len(pkg["apps"]) > 1
    ]

    return {
        "all_packages": all_packages,
        "shared_vulnerable": shared_vulnerable,
        "applications": list(app_vulnerability_summary.values())
    }
