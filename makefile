# Build all docker images.
build:
	docker build -t dwmkerr/ece-psp-bad -f prefer-single-process/Dockerfile.bad prefer-single-process/.
	docker build -t dwmkerr/ece-psp-good -f prefer-single-process/Dockerfile.good prefer-single-process/.
	docker build -t dwmkerr/ece-rs -f respect-signals/Dockerfile respect-signals/.

push:
	docker push dwmkerr/ece-psp-bad
	docker push dwmkerr/ece-psp-good
	docker push dwmkerr/ece-rs
