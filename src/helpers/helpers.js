export const locationHelper = (location, userRegion) => {

    let currentLocation = location.pathname.replace(/^\//g, '')
    currentLocation = currentLocation.split("/")[0]

    let region = currentLocation;
    switch(currentLocation)
    {
        case "":
            region = "home"
        break;
        case "panel":
            region = userRegion
        break;
        default:
            region = "home"
    }
    console.log(region)

    return region;
}