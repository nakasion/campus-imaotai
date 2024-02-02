FROM openjdk:8

RUN RUN /bin/cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \&& echo 'Asia/Shanghai' >/etc/timezone

EXPOSE 8160

WORKDIR /home/campus/conf

ADD target/campus-modular.jar /home/campus-service.jar

ENTRYPOINT ["java", "-jar", "/home/campus-service.jar"]
