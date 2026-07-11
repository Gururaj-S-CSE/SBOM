def calculate_risk_score(
    vulnerabilities,
    licenses,
    maintenance,
    application
):

    score = 0

    # -------------------------
    # Vulnerability Score
    # -------------------------
    for package in vulnerabilities:

        for vuln in package["vulnerabilities"]:

            score += vuln["cvss_score"]

    # -------------------------
    # License Penalty
    # -------------------------
    for item in licenses:

        risk = item["risk"].upper()

        if risk == "LOW":
            score += 1

        elif risk == "MEDIUM":
            score += 3

        elif risk == "HIGH":
            score += 6

        elif risk == "CRITICAL":
            score += 10

    # -------------------------
    # Maintenance Penalty
    # -------------------------
    for item in maintenance:

        if item["maintenance"] == "UNMAINTAINED":
            score += 5

    # -------------------------
    # Application Criticality
    # -------------------------
    criticality = application["criticality"].upper()

    if criticality == "LOW":
        score *= 1

    elif criticality == "MEDIUM":
        score *= 1.25

    elif criticality == "HIGH":
        score *= 1.5

    elif criticality == "CRITICAL":
        score *= 2

    # -------------------------
    # Risk Level
    # -------------------------
    if score < 15:
        level = "LOW"

    elif score < 35:
        level = "MEDIUM"

    elif score < 60:
        level = "HIGH"

    else:
        level = "CRITICAL"

    return {
        "risk_score": round(score, 2),
        "risk_level": level
    }