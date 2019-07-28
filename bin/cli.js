const fs = require("fs");
const path = require("path");
//import path from "path";



let reco = {

    constructor: (args) => {

        reco.state = {
            args: args,
            clientArgsAfter: "",
            callBack_replaceWwwRootDir: () => { },
            child_process: require('child_process'),
        }

        //----- save the args after index 
        var clientArgsAfter = "";
        for (let index = 1; index < args.slice(2).length; index++)
            clientArgsAfter += (args.slice(2)[index] + " ");
        reco.setState({ clientArgsAfter: clientArgsAfter });

        ///------////
        switch (args.slice(2)[0]) {
            case "init":
                reco.init();
                break;
            case "build":
                reco.build();
                break;
            case "react":
                reco.react();
                break;
            case "start":
                reco.reactStart();
                break;
            case "test":
                reco.reactTest();
                break;
            case "install":
                reco.reactInstall();
                break;
            case "i":
                reco.reactInstall();
                break;
            case "cordova":
                reco.cordova();
                break;
            case "plugin":
                reco.cordovaPlugin();
                break;
            case "-info":
                reco.info();
                break;
            default:
                () => {
                    console.log();
                    console.log(args.slice(2)[0], "it is not exec in reco cli");
                    console.log('try => ');
                    reco.map();
                }
        }

    },

    //------------------------------------build------------------------------------//
    build: () => {
        console.log();
        console.log('start build react');
        console.log();
        reco.state.child_process.exec(
            'npm run build'
            , { cwd: 'react' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-react-cli ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            }).on('close', function () {

                console.log();
                console.log('reco start to build cordova');
                console.log();

                reco.state.callBack_replaceWwwRootDir = function () {

                    reco.state.child_process.exec(
                        'cordova build ' + reco.state.clientArgsAfter
                        , { cwd: 'cordova' }
                        , function (error, stdout, stderr) {
                            if (error) {
                                console.error('reco-cli-build-cordova ERROR : ' + error);
                                return;
                            }
                            if (stdout) console.log(stdout);
                            if (stderr) console.log(stderr);

                        }).on('close', function () {
                            reco.succeeded();
                        }).stdout.on('data', (data) => {
                            console.log(data.toString().replace("reco", "react"));
                        });

                };

                reco.replaceWwwRootDir();

            });

    },

    //------------------------------------init------------------------------------//
    init: () => {

        // const rootDir = path.join(__dirname, '..');
        // ${rootDir}

        console.log();
        console.log('---------reco start to build react-app---------');
        reco.state.child_process.exec(
            'npx create-react-app reco'
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-cli-init-react ERROR : ' + error);
                    return;
                }
                if (stdout)
                    console.log(stdout.toString().replace("reco", "react"));
                if (stderr)
                    console.log(stderr.toString().replace("reco", "react"));

            }).stdout.on('data', (data) => {
                console.log(data.toString().replace("reco", "react"));
            })
            .on('close', function () {


                fs.renameSync(`./reco`, `./react`
                    , function (error, stdout, stderr) {
                        if (error) {
                            console.error('reco-cli-init-renameReactFolder ERROR : ' + error);
                            return;
                        }
                        console.log(stdout);

                    }
                );

                reco.state.child_process.exec(
                    'npm i react.cordova-navigation_controller'
                    , { cwd: 'react' }
                    , function (error, stdout, stderr) {
                        if (error) {
                            console.error('reco-cli-init--install-react.cordova-navigation_controller ERROR : ' + error);
                            return;
                        }
                        console.log(stdout);
                    }).on('data', (data) => {
                        console.log(data.toString());
                    }).on('close', () => {


                        //--פה צריך לעשות שינוי בקבצים מסויים 

                        //--
                        //---------reco start to build cordova-app---------//
                        console.log();
                        console.log('---------reco start to build cordova-app---------');
                        console.log();
                        reco.state.child_process.exec(
                            'cordova create cordova ' + reco.state.clientArgsAfter
                            , function (error, stdout, stderr) {
                                if (error) {
                                    console.error('reco-cli-init-cordova-(cordova create cordova) ERROR :' + error);
                                    return;
                                }
                                console.log(stdout);
                            }).on('data', (data) => {
                                console.log(data.toString());
                            })
                            .on('close', function () {

                                reco.state.child_process.exec(
                                    'cordova platform add android'
                                    , { cwd: 'cordova' }
                                    , function (error, stdout, stderr) {
                                        if (error) {
                                            console.error('reco-cli-init-cordova--(cordova platform add android) ERROR :' + error);
                                            return;
                                        }
                                        console.log(stdout);
                                    }).on('data', (data) => {
                                        console.log(data.toString());
                                    }).on('close', function () {

                                        reco.state.child_process.exec(
                                            'cordova platform add ios'
                                            , { cwd: 'cordova' }
                                            , function (error, stdout, stderr) {
                                                if (error) {
                                                    console.error('reco-cli-init-cordova--(cordova platform add ios) ERROR :' + error);
                                                    return;
                                                }
                                                console.log(stdout);
                                            }).on('data', (data) => {
                                                console.log(data.toString());
                                            }).on('close', function () {

                                                reco.state.child_process.exec(
                                                    'cordova platform ls'
                                                    , { cwd: 'cordova' }
                                                    , function (error, stdout, stderr) {
                                                        if (error) {
                                                            console.error('reco-cli-init-cordova--(cordova platform ls) ERROR :' + error);
                                                            return;
                                                        }
                                                        console.log(stdout);
                                                    }).on('data', (data) => {
                                                        console.log(data.toString());
                                                    }).on('close', function () {

                                                        reco.state.child_process.exec(
                                                            'npm run build'
                                                            , { cwd: 'react' }
                                                            , function (error, stdout, stderr) {
                                                                if (error) {
                                                                    console.error('reco-react-cli ERROR : ' + error);
                                                                    return;
                                                                }
                                                                console.log(stdout);
                                                            }).on('close', function () {
                                                                reco.state.callBack_replaceWwwRootDir = function () {

                                                                    reco.succeeded();
                                                                };
                                                                reco.recoFiles(() => { reco.replaceWwwRootDir(); });
                                                            });
                                                    });
                                            });
                                    });

                            });

                        //-- 

                    });

            });

    },

    //------------------------------------react------------------------------------//
    react: () => {
        reco.state.child_process.exec(
            'npm ' + reco.state.clientArgsAfter
            , { cwd: 'react' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-cli-react ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            }).on('data', (data) => {
                console.log(data.toString());
            });

    },

    //------------------------------------react start------------------------------------//
    reactStart: () => {
        reco.state.child_process.exec(
            'npm start'
            , { cwd: 'react' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-cli-reactStart ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            }).on('data', (data) => {
                console.log(data.toString());
            });
    },


    //------------------------------------react test------------------------------------//
    reactTest: () => {
        reco.state.child_process.exec(
            'npm test'
            , { cwd: 'react' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-cli-reactTest ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            }).on('data', (data) => {
                console.log(data.toString());
            });

    },

    //------------------------------------react install------------------------------------//
    reactInstall: () => {
        reco.state.child_process.exec(
            'npm i ' + reco.state.clientArgsAfter
            , { cwd: 'react' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-cli-reactInstall ERROR : ' + error);
                    return;
                }
                console.log(stdout);
            }).on('data', (data) => {
                console.log(data.toString());
            });

    },

    //------------------------------------cordova------------------------------------//
    cordova: () => {

        reco.state.child_process.exec(
            'cordova ' + reco.state.clientArgsAfter
            , { cwd: 'cordova' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-cli-cordova ERROR : ' + error);
                    return;
                }
            }).on('data', (data) => {
                console.log(data.toString());
            });
    },

    //------------------------------------cordovaPlugin------------------------------------//
    cordovaPlugin: () => {

        reco.state.child_process.exec(
            'cordova plugin ' + reco.state.clientArgsAfter
            , { cwd: 'cordova' }
            , function (error, stdout, stderr) {
                if (error) {
                    console.error('reco-cli-cordovaPlugin ERROR : ' + error);
                    return;
                }
            }).on('data', (data) => {
                console.log(data.toString());
            });
    },

    //------------------------------------info------------------------------------//
    info: () => {
        console.log(' info=> https://github.com/orchoban/react.cordova');
        console.log();
        reco.map();

    },

    //------------------------------------map------------------------------------//
    map: () => {
        console.log('init');
        console.log('build');
        console.log('build <cordova-platform>');
        console.log('react');
        console.log('start');
        console.log('test');
        console.log('install || i');
        console.log('');
        console.log('cordova');
        console.log('-info');


    },

    //------------------------------------credit------------------------------------//
    credit: () => {
        console.log(`
       #####Created by Or Chuban (Choban)#####
        info=> https://github.com/orchoban/react.cordova`);
    },

    //------------------------------------succeeded------------------------------------//
    succeeded: () => {
        console.log();
        console.log("----------------------------------------------");
        console.log('---------------!reco succeeded!---------------');
        console.log("----------------------------------------------");
        console.log();
        reco.credit();
    },






    //-------------------------------------------------------------------------------//
    //------------------------------------helpers------------------------------------//
    //-------------------------------------------------------------------------------//
    setState: (state) => {
        for (var item in state) {
            reco.state[item] = state[item]
        }
    },

    //-------------------------remove all files and folders in =>./cordova/www--------------------------//
    replaceWwwRootDir:
        async (dirPath = './cordova/www', options = {}) => {
            const
                { removeContentOnly = false, drillDownSymlinks = false } = options,
                { promisify } = require('util'),
                readdirAsync = promisify(fs.readdir),
                unlinkAsync = promisify(fs.unlink),
                rmdirAsync = promisify(fs.rmdir),
                lstatAsync = promisify(fs.lstat) // fs.lstat can detect symlinks, fs.stat can't
            let
                files

            try {
                files = await readdirAsync(dirPath)
            } catch (e) {
                throw new Error(e)
            }

            if (files.length) {
                for (let fileName of files) {
                    let
                        filePath = path.join(dirPath, fileName),
                        fileStat = await lstatAsync(filePath),
                        isSymlink = fileStat.isSymbolicLink(),
                        isDir = fileStat.isDirectory()

                    if (isDir || (isSymlink && drillDownSymlinks)) {
                        await reco.replaceWwwRootDir(filePath)
                    } else {
                        await unlinkAsync(filePath)
                    }
                }
            }

            if (!removeContentOnly)
                await rmdirAsync(dirPath);


            if (!fs.existsSync('cordova/www')) {
                var ncp = require('ncp').ncp;

                ncp.limit = 9999999999999;

                ncp("./react/build", "./cordova/www", function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    reco.state.callBack_replaceWwwRootDir(); // callBack();
                });
            }

        },


    //------------------------------------recoFiles------------------------------------//
    recoFiles: (callBack = () => console.log("reco!!!")) => {



        //-- ./react/public/index.html --//
        fs.readFile('./react/public/index.html', function (err, data) {
            // res.writeHead(200, {'Content-Type': 'text/html'});
            // res.write(data);
            // res.end();
            if (err) console.log("error: ", err);

            const dataString = data.toString().replace("<head>",
                `<head> 
            <script type="text/javascript" src="./cordova.js"></script>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, shrink-to-fit=no">
            <meta name="viewport" content="user-scalable=no, initial-scale=1,
                  maximum-scale=1, minimum-scale=1, target-densitydpi=device-dpi" />
            `)
            fs.writeFile("./react/public/index.html", dataString, function (err) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log("./react/public/index.html ready to by mobile app with cordova");

                    //-- react package.json --//
                    const jsonfile = require('jsonfile');
                    const file = './react/package.json';
                    jsonfile.readFile(file)
                        .then(obj => {

                            obj.homepage = "./";
                            jsonfile.writeFile(file, obj, function (err) {
                                if (err) {
                                    console.error("ERROR: add homepage to react package.json . ", err);
                                    return;
                                } else {
                                    console.log("updete homepage in react package.json , now it's ready to by mobile app with cordova.");
                                    callBack();
                                }
                            })
                        })
                        .catch(error => console.error("reco-cli-recoFiles=> ERROR: ", error))
                }
            });
        });

    },



}






export function cli(args) {


        if ((fs.existsSync("./cordova") && fs.existsSync("./react")) || args.slice(2)[0] === "init") {
            reco.constructor(args);
        } else {

            console.log("");
            console.log("");
            console.log("");
            console.log("it is not reco based project");
            console.log("");
            console.log("try to run =>  reco init <com.yourAppId> <yourAppName>");
            console.log("");
        }
}