export function init( conf, modules ) {
    modules = Object.assign( {}, modules );

    // Configurate
    this.name = this.name || 'mosquito';
    if ( conf && typeof conf == 'object' ) {
        // Add plugs for uninstall modules
        this.lang = {
            t: function( string ) { return string; },
            get localization() { return 'en'; }
        }
        if ( !String.t ) String.prototype.t = function() { return this.toString(); }
        if ( !String.$m_t ) String.prototype.$m_t = function() { return this.toString(); }
        this.test = {}

        // Formatting config object
        Object.assign(
            conf = conf instanceof Array ? { on: conf } : conf,
            { on: conf.on || Object.keys( modules ), off: conf.off || [] }
        );

        // Modules on/off
        Object.keys( modules ).forEach( m => {
            if ( !~conf.on.indexOf( m ) || ~conf.off.indexOf( m ) ) delete modules[ m ];
        });

        // Redefine modules methods with user config
        Object.keys( conf )
            .filter( m => m != 'on' && m != 'off' && typeof conf[ m ] == 'object' )
            .forEach( m => Object.assign( modules[ m ] = modules[ m ] || {}, conf[ m ] ) );
    }

    // Link to root
    Object.keys( modules ).forEach( m => modules[ m ].parent = this );

    // Include modules
    Object.assign( this, modules );
}