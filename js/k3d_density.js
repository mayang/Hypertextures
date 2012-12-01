// mah stuff!

// D(x) = sphere(x(1+(1/f)noise(fx)))
// WHAT THE HELL IS SPHERE
// f(x, y, z) = x^2 + y^2 + z^2? ok whatever!
function BasicNoise(points, f) { // this was called before scaled so it should be fine
    var simplex = new SimplexNoise()
    for (var i = 0; i < points.length; ++i) {
        //if (points[i].x*points[i].x + points[i].y*points[i].y + points[i].z*points[i].z > 1) continue;
        var nfx = simplex.noise3D(points[i].x * f, points[i].y * f, points[i].z * f);
       // console.log(nfx);
        var amp = 1 / f;
        var bump = (1 + amp*nfx);
        var xbump = points[i].x * bump;
        var ybump = points[i].y * bump;
        var zbump = points[i].z * bump;
        points[i].D = xbump*xbump + ybump*ybump + zbump*zbump; 
    }
}

function DNoise(point, s, f) { // this gets called after scale! it's for the march so should redo it!
    // uh i guess i can temporarily uncsale...
    // THIS ONLY HANDLES SPHERES RIGHT NOW!
    var innerRsq = (1 - (s/2))*(1 - (s/2));
    var outerRsq = (1 + (s/2))*(1 + (s/2));
    var dist = point.x*point.x + point.y*point.y + point.z*point.z;
    if (dist < innerRsq) return 1.0;
    if (dist > outerRsq) return 0.0;
    var simplex = new SimplexNoise()
    var nfx = simplex.noise3D(point.x * f, point.y * f, point * f);
   // console.log(nfx);
    var amp = 1 / f;
    var bump = (1 + amp*nfx);
    var xbump = points[i].x * bump;
    var ybump = points[i].y * bump;
    var zbump = points[i].z * bump;
    return xbump*xbump + ybump*ybump + zbump*zbump;     
}

function calculateGradiant(face, obj) {
    // average all the Ds
    var vertices = face.vertices;
    var points = obj.points;
    var delta = 0.1; // temp!
    var worldN = new Vector3D(0, 0, 0);
    var f = obj.freq;
    for (var i = 0; i < vertices.length; ++i) {
        // march down a ray that goes through this point
        // TO DO THIS PART RIGHT NOW I'm JUST ASSUMING THERE IS ONLY STUFF ON THE SPHERE SHELL
        // REMEMBER! SCALE EVERYTHING! since i'm going to like move the steps and size
        // lets just see if it works....
        // and maybe convert this all into an object so sphere radius 1, r is now 40!
        // though I guess I can unscale
        // I think I use model space and not screen space since i'm redoing normals
        // and normals are done in screen?
        // and it will get converted to worldNormal
        var unscaled= {x:0, y:0, z:0}; // ????
        unscaled.x = points[vertices[i]].x / obj.scale;
        unscaled.y = points[vertices[i]].y / obj.scale;
        unscaled.z = points[vertices[i]].z / obj.scale;
        
        var x_deltaU = {x:0, y:0, z:0};
        x_deltaU.x = unscaled.x;
        x_deltaU.y = unscaled.y;
        x_deltaU.z = unscaled.z - delta;
        
        var x_deltaV = {x:0, y:0, z:0};
        x_deltaV.x = unscaled.x;
        x_deltaV.y = unscaled.y + delta;
        x_deltaV.z = unscaled.z;
        
        var x_deltaW = {x:0, y:0, z:0};
        x_deltaW.x = unscaled.x + delta;
        x_deltaW.y = unscaled.y;
        x_deltaW.z = unscaled.z;
        
        points[vertices[i]].gradiant = new Vector3D( (points[vertices[i]].D - DNoise(x_deltaU, 0, f)) * delta,
                                                    (DNoise(x_deltaV, 0, f) - points[vertices[i]].D) * delta,
                                                    (DNoise(x_deltaW, 0, f) - points[vertices[i]].D) * delta).norm();
        worldN.x += points[vertices[i]].gradiant.x;
        worldN.y +=  points[vertices[i]].gradiant.y;
        worldN.z +=  points[vertices[i]].gradiant.z;
    }
    worldN.x /= vertices.length;
    worldN.y /= vertices.length;
    worldN.z /= vertices.length;
    
    
    
    
    
    face.worldnormal = worldN; 
}
