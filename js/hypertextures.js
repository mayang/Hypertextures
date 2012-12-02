function BasicNoise(x, y, z) {
        f = 1; // TEMP
        var simplex = new SimplexNoise()
        //var nfx = simplex.noise3D(x * f, y * f, z * f);
        var nfx = simplex.noise2D(x*f, y*f);
        console.log("nfx" + nfx);
        return nfx;
        var amp = 1 / f;
        var bump = (1 + amp*nfx);
        var xbump = x * bump;
        var ybump = y * bump;
        var zbump = z * bump;
        return  xbump*xbump + ybump*ybump + zbump*zbump; 
}