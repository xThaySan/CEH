FROM stilliard/pure-ftpd

ENV USERS="admin|arLEViaLI"
ENV FTP_USER_NAME="admin"
ENV FTP_USER_PASS="Sup3Rs3CuReP4sS"
ENV FTP_USER_HOME="/home/admin"
RUN mkdir -p "$FTP_USER_HOME"

RUN useradd -m ftp
RUN sed -i '/ChrootEveryone/s/yes/no/1' /etc/pure-ftpd/pure-ftpd.conf
RUN echo "FLAG{FTp_pIv0TInG_4ttack}" > /home/ftp/flag.txt

# Entrypoint
CMD ["/bin/sh", "-c", "/run.sh -c 2 -C 2 -l puredb:/etc/pure-ftpd/pureftpd.pdb -j -R -P $PUBLICHOST -p 30000:30009d"]