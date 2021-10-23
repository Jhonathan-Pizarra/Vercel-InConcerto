import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {Link as MuiLink, makeStyles} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    icon: {
        marginRight: theme.spacing(0.5),
        marginBottom: 0,
        width: 20,
        height: 20,
    },
    nav: {
        display: "table-row",
        //position: "inheriti",
    },
    breads: {
        display: "table-cell",
        //direction: "row",
        //position: "static",
        //top: "15%;",
        // zIndex: 100,
    },

}));

const convertBreadcrumb = string => {
    var cast = string.replace(/-/g, ' ')
        .replace(/oe/g, 'ö')
        .replace(/ae/g, 'ä')
        .replace(/ue/g, 'ü')
        .replace(/\?.*/, '')
        .toLowerCase();

    return string.charAt(0).toUpperCase()+cast.slice(1);
};

export const Breadcrumbs = () => {

    const classes = useStyles();
    const router = useRouter();
    const [breadcrumbs, setBreadcrumbs] = useState(null);


    useEffect(() => {
        if (router) {
            const linkPath = router.asPath.split('/').filter(x=>x);
            //linkPath.shift();

            const pathArray = linkPath.map((path, i) => {
                //console.log('VEMOAS', typeof (path));
                //console.log('ISNAN', isNaN(path) ? path : 'detalle');
                //path.filter(x=>x);
                console.log("PATH", path);
                const validate = (isNaN(path)) ? path : 'detalle';
                return {
                    breadcrumb: validate, href: '/' + linkPath.slice(0, i + 1).join('/')
                };
            });

            setBreadcrumbs(pathArray);
        }
    }, [router]);

    if (!breadcrumbs) {
        return null;
    }

    return (


        <nav aria-label="breadcrumbs" className={classes.nav}>
            <ol className="breadcrumb">
                <Link href="/" passHref>
                    <MuiLink className={classes.breads}>
                        <HomeIcon/>Home&ensp;|&ensp;
                    </MuiLink>
                </Link>
                {breadcrumbs.map((breadcrumb, i) => {
                    /*console.log('que es?', breadcrumb);
                    console.log('y esto?', breadcrumb.href);
                    console.log('y luego?', breadcrumb.breadcrumb);*/
                    return (
                        <Link key={breadcrumb.href} href={breadcrumb.href}  passHref >
                            <MuiLink className={classes.breads}>
                                {convertBreadcrumb(breadcrumb.breadcrumb)}
                                &ensp;|&ensp;
                            </MuiLink>
                        </Link>
                    );
                })}

            </ol>
        </nav>

    );
};
