FROM stilliard/pure-ftpd

ENV USERS="admin|arLEViaLI"
ENV FTP_USER_NAME="admin"
ENV FTP_USER_PASS="Sup3Rs3CuReP4sS"
ENV FTP_USER_HOME="/home/admin"


RUN mkdir -p "$FTP_USER_HOME"
RUN echo "FLAG{FTp_pIv0TInG_4ttack}" > /home/admin/flag.txt

# Entrypoint
COPY scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]