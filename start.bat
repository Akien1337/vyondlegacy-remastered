:: Important stuff
@echo off && cls
title GoAnimate Wrapper

::::::::::::::::::::
:: Initialization ::
::::::::::::::::::::

cls

:::::::::::::::::::::::::::::
:: Start GoAnimate Wrapper ::
:::::::::::::::::::::::::::::

:: Check for installation
if exist notinstalled (
	echo GoAnimate Wrapper is not installed! Installing...
	call npm install
	ren "notinstalled" "installed"
	cls
	goto start
) else (
	goto start
)

:: Run npm start
:start
echo GoAnimate Wrapper is now starting...
echo Please navigate to http://localhost on your browser.
npm start
