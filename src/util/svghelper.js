const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

export const describeArc = (x, y, radius, startAngle, endAngle) => {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
    return d;
}

export const describeArcRegion = (x, y, radiusA, radiusB, startAngle, endAngle) => {
    var startA = polarToCartesian(x, y, radiusA, endAngle);
    var endA = polarToCartesian(x, y, radiusA, startAngle);
    var startB = polarToCartesian(x, y, radiusB, endAngle);
    var endB = polarToCartesian(x, y, radiusB, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    var d = [
        "M", startA.x, startA.y,
        "A", radiusA, radiusA, 0, largeArcFlag, 0, endA.x, endA.y,
        "L", endA.x, endA.y, endB.x, endB.y,
        "A", radiusB, radiusB, 0, largeArcFlag, 1, startB.x, startB.y,
        "L", startB.x, startB.y, startA.x, startA.y
    ].join(" ");
    return d;
}