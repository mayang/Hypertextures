function BasicNoise(x, y, z) {
        var freq = 1; // TEMP
        var simplex = new SimplexNoise()
        var nfx = simplex.noise3D(x * freq, y * freq, z * freq);
        //var nfx = simplex.noise2D(x*f, y*f);
        console.log("nfx" + nfx);
       // return nfx;
        var amp = 1 / freq;
        var bump = (1 + amp*nfx);
        var xbump = x * bump;
        var ybump = y * bump;
        var zbump = z * bump;
        return  xbump*xbump + ybump*ybump + zbump*zbump; 
}
