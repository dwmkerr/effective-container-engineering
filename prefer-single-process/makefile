build-bad:
	docker build -t dwmkerr/ece-psp-bad -f Dockerfile.bad .

run-bad: build-bad
	docker run -it -p 3001:8080 dwmkerr/ece-psp-bad

build-good:
	docker build -t dwmkerr/ece-psp-good -f Dockerfile.good .

run-good:
	docker run -it -p 3002:8080 dwmkerr/ece-psp-good
